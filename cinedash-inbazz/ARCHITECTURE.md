# Arquitetura — CineDash

Este documento explica o porquê das decisões técnicas que tomei durante o desafio. A intenção é explicar o motivo de cada escolha — não só o que foi usado — para que seja possível avaliar da melhor forma trade-offs que decidi.

---

## 1. Estrutura de pastas — Feature-Sliced Design

A pasta `src/` segue [Feature-Sliced Design](https://feature-sliced.design/) com seis camadas:

```
app  →  pages  →  widgets  →  features  →  entities  →  shared
```

A regra de dependência é **unidirecional**: uma camada só pode importar de camadas **mais baixas** que ela. `features/watchlist` pode usar `entities/movie` e `shared/ui/button`; o inverso é proibido. Isso evita ciclos e mantém o domínio fluindo de "mais abstrato" (shared) para "mais específico" (app).

A escolha de FSD em vez de uma estrutura plana vem de três motivos:

- **Escala**: o desafio pede "código que escala". FSD é prescritivo o suficiente para que um time de quatro a cinco pessoas mexa no mesmo repositório sem se atropelar — cada feature é um silo com `model/`, `lib/`, `ui/` e `api/` quando aplicável, e os pontos de extensão ficam óbvios.
- **Granularidade do domínio**: como todos os pontos da aplicação são naturalmente divididos em "filme", "gênero" (entities), "watchlist", "filtros", "tema", "auth" (features), "tabela de filmes", "header", "detalhes do filme" (widgets) fica mais fácil e prático entender contextos, encontrar soluções e fazer boas construções.
- **Exportação em arquivo único**: cada pasta `features/<x>/index.ts` exporta os pontos essenciais da feature. O resto fica privado. Tornando mais fácil a importaçãoa em pontos necessários.

### Mapa rápido

| Camada | Conteúdo | Exemplo no repo |
| --- | --- | --- |
| `app` | bootstrap, router, providers globais, layout raiz | `app/providers/index.tsx` monta QueryClient + Toaster + RouterProvider |
| `pages` | rotas — orquestram widgets e features | `pages/dashboard/ui/dashboard-page.tsx` |
| `widgets` | composições de UI grandes, autocontidas | `widgets/movies-table` (tabela desktop + cards mobile + skeleton) |
| `features` | capacidades isoladas (estado, hooks, UI) | `features/watchlist` (store, hook de feedback, toggle) |
| `entities` | modelos de domínio + acesso à API | `entities/movie` (types, image helpers, queries) |
| `shared` | primitivos reusáveis | `shared/ui/button`, `shared/lib/toast`, `shared/api/tmdb-client` |

---

## 2. Stack e justificativas

### React 19 + TypeScript estrito + Vite

React 19 traz o `use no memo` opt-in que o `react-table` precisa em certos casos, e os hooks novos (`useOptimistic`, etc.) embora não tenham sido necessários aqui. O TypeScript está em **strict mode**; nenhum `any` no código de produção. Vite foi a opção escolhida para um SPA dessa escala.

### TanStack Query (server state)

A regra é simples: **dados que vêm da TMDB nunca moram em estado de cliente**. Toda chamada à TMDB passa por `useQuery` com chaves estruturadas:

```ts
movieKeys = {
    all: ['movies'],
    lists: () => [...all, 'list'],
    list: (filters) => [...lists(), filters],
}
```

Hierarquia importante porque permite invalidar tudo (`movieKeys.all`), só listas (`movieKeys.lists()`) ou um filtro específico. O `staleTime` de 60s evita refetch agressivo quando o usuário faz back/forward entre páginas.

A função `placeholderData` recebe os dados anteriores e decide se preserva durante a transição. A heurística atual usa `haveSameFilters` comparando todos os campos da query: quando algo muda (filtro **ou** página), o skeleton aparece — feedback explícito de "isso é uma página nova". Quando nada muda (refetch interno), os dados antigos ficam visíveis.

Erros são capturados num único ponto via `QueryCache.onError` e `MutationCache.onError` no `QueryClient`. Cada falha de rede vira um `toast.error` automaticamente. Isso elimina boilerplate por hook — adicionar uma nova query amanhã já ganha o feedback de erro de graça.

### TanStack Router (rotas com loaders)

Escolhido sobre React Router por:

- **Tipagem ponta-a-ponta**: `Link to="/movie/$movieId" params={{ movieId }}` é validado em compile time. Erros de rota viram erros de TypeScript.
- **Code splitting nativo** por rota.
- **Search params como state**: filtros do dashboard poderiam ser guardados na URL via search params. (Ainda não implementado — registrado em "trade-offs".)

### TanStack Table

`react-table` v8 é headless: ele só calcula sorting/filtering/pagination, a renderização fica a cargo do componente. As colunas (`buildMoviesColumns`, `buildWatchlistColumns`) são **funções puras** que recebem o mapa de gêneros e devolvem `ColumnDef[]`.

### Zustand

Três stores totalmente independentes, cada uma com responsabilidade única:

| Store | Persiste | Razão |
| --- | --- | --- |
| `useAuthStore` | Sim (`localStorage`) | Sessão deve sobreviver ao reload |
| `useWatchlistStore` | Sim (`localStorage`) | Lista persiste entre sessões |
| `useThemeStore` | Sim (`localStorage`) | Tema persiste entre sessões |
| `useMoviesFiltersStore` | Não | Filtros não devem persistir entre sessões |

Optei por Zustand
 porque o que precisamos é **simples**: três stores de estado pequenas, sem fluxo cross-store. O middleware `persist` resolve a persistência sem precisar de `redux-persist`. O bundle inicial fica em torno de 1KB gzipped por store.

### React Hook Form + Zod

`react-hook-form` mantém o estado do formulário fora do React state, assim, re-renders só acontecem quando necessário, gerando uma boa performance em formulários longos. `zodResolver` conecta o schema declarativo do Zod ao react-hook-form, validando os inputs que são inseridos pelo usuário.

### shadcn/ui + Tailwind v4

Não importei shadcn como dependência geral, copiei só os primitivos que precisava (Button, Card, Input, Label, Select, Sheet, Skeleton, Table) para `shared/ui/`. Além disso, utilizei o Tailwind em pontos que precisavam ed um design mais "dedicado".

### Sonner (toasts)

O Toast feedback foi centralizado em `shared/lib/toast.ts` que envelopa o `sonner`. Dois pontos de uso:

- **Operações de watchlist** (add/remove/clear): um hook `useWatchlistActions` envolve as chamadas do store em `try/catch` e dispara success/error. Mantém o store puro (Zustand não conhece UI).
- **Falhas de API**: `QueryCache`/`MutationCache` global no `QueryClient` dispara `toast.error` automaticamente.

O `<Toaster />` lê o tema do `useThemeStore` e atualiza visualmente em modo dark/light.

### Vitest + Testing Library

Utilizei Vitest já que utiliza a mesma config do Vite. Testing Library porque os testes ficam mais voltados para a renderização final e o que "o usuário vê" em vez de "esse componente recebe essa prop". A regra adotada foi:

- **Hooks complexos**: `useDebounce` (timer-based), `auth.schema` (Zod).
- **Lógica de tabela**: `buildMoviesColumns`, `buildGenreMap`, `pickBestTrailer` testados como funções puras.
- **Fluxos de UI**: `LoginForm` (validação + submit), `Pagination` (estados disabled, callbacks), `MoviesTable` (renderização + sorting).
- **Stores**: `watchlistStore` testado isolado com `localStorage` mockado.

Não persegui 100% de cobertura, tentei buscar testes que **falhariam de forma útil** se uma regra de negócio quebrasse.

---

## 3. Decisões de produto/UX

### Autenticação simulada

Sem backend, o login é uma simulação que:

1. Valida `email` (Zod email format) e `password` (mínimo 6 caracteres) no cliente.
2. Gera um "token" arbitrário (timestamp + email) e persiste no `localStorage` via Zustand.
3. Marca `isAuthenticated = true` no store.
4. O `RootLayout` monta um `AuthWatcher` que escuta mudanças de `isAuthenticated` e redireciona para `/login` ou `/movies` conforme apropriado.

A sessão sobrevive ao reload graças ao middleware `persist`. Logout limpa o store, o `localStorage`, e redireciona via TanStack Router.

Essa abordagem é deliberadamente **anti-pattern para produção** — em produção a fonte da verdade da sessão é o backend e o cliente apenas armazena tokens emitidos. Aqui a inversão é necessária pela ausência de servidor; foi documentada para deixar claro que é uma simulação.

### Skeleton e estados de loading

Três níveis de feedback durante o carregamento:

1. **Skeleton "primeiro load"**: quando não há dados em cache, `MoviesTableSkeleton` renderiza 8 linhas (desktop) ou 5 cards (mobile). Default conservador para não ocupar mais que a viewport, evitando scroll desnecessário.
2. **Refetch silencioso**: quando há dados anteriores e `staleTime` ainda valida, o usuário nem percebe.
3. **Erro**: `MoviesEmptyState` com mensagem e descrição, **+ toast.error global** disparado pelo `QueryCache`.

### Componente `SmartImage`

Imagens da TMDB têm latência variável e nem sempre existem (`poster_path: null`). O componente `shared/ui/image/SmartImage` cuida disso:

- Estado interno `loading | loaded | error` derivado do `onLoad`/`onError` nativos do `<img>`.
- Skeleton overlay enquanto carrega (com fade-in suave).
- `fallback` slot para quando não há `src` ou o load falhou.
- Usa o padrão "ajustar estado durante o render" do React 18+ ([docs oficiais](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)) em vez de `useEffect` para resincronizar quando a `src` muda, evitando o render extra que o lint do React Compiler sinaliza.

### Layout responsivo: tabela em desktop, cards em mobile

A `MoviesTable` e a `WatchlistTable` rendem dois layouts no DOM, controlados puramente por CSS:

```tsx
<div className="md:hidden"><MoviesCardList ... /></div>
<div className="hidden md:block"><Table>...</Table></div>
```

O switch é em `md` (768px). Em mobile, os cards verticalizados substituem a tabela com 5 colunas. Em desktop, a tabela com sorting clicável é mais densa e funcional.

### Acessibilidade

O `Sheet` da Radix exige um `Dialog.Title`. Quando não cabe no design (menu mobile do header), o título é renderizado com `sr-only` — invisível visualmente, audível para screen readers. Mesma técnica usada para os labels "Ações" das colunas e "Remover X da lista" dos botões de lixeira.

`aria-pressed` no botão da watchlist comunica o estado toggle. `aria-label` em todos os ícones-only (Trash2, Menu).

---

## 5. O que eu mudaria com mais tempo

- **TanStack Router search params** para filtros no URL (compartilhar busca por link).
- **Prefetch** de detalhes no hover do botão "Detalhes" (`queryClient.prefetchQuery` no `onMouseEnter`).
- **Otimistic updates** na watchlist usando `useMutation` + `onMutate` — o store atual é síncrono então não é estritamente necessário, mas seria a base se a watchlist virasse persistente em backend.
- **Suite E2E mínima** com Playwright cobrindo "login → dashboard → adiciona filme → vai para watchlist → remove".
- **i18n**: extrair strings para `messages.ts` com `react-i18next` ou `format-message`. Hoje as strings estão em pt-BR inline.
- **Test ID stability**: alguns testes dependem de `getByText` com strings literais. Adicionar `data-testid` em pontos críticos reduziria fragilidade.

---

## 6. Mapa rápido de arquivos relevantes

| Pergunta | Arquivo |
| --- | --- |
| Como a TMDB é chamada? | `shared/api/tmdb-client.ts` |
| Como queries são definidas? | `entities/<x>/api/<x>.queries.ts` |
| Onde mora a lógica de loading/error global? | `app/providers/index.tsx` (QueryCache + MutationCache) |
| Como a watchlist é persistida? | `features/watchlist/model/watchlist.store.ts` |
| Como auth funciona sem backend? | `features/auth/model/auth.store.ts` + `features/auth/ui/auth-watcher.tsx` |
| Como o tema escuro é aplicado? | `features/theme/model/theme.store.ts` + `app/providers/theme-provider.tsx` |
| Como toasts são disparados? | `shared/lib/toast.ts` (helper) + `app/providers/index.tsx` (montagem do `<Toaster/>`) |
| Onde está a tabela de filmes? | `widgets/movies-table/ui/movies-table.tsx` (desktop) + `movies-card-list.tsx` (mobile) |
| Onde estão as colunas da tabela? | `widgets/movies-table/lib/columns.tsx` (funções puras testadas) |
