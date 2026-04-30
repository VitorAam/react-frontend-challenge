# CineDash

Dashboard de curadoria e descoberta de filmes construído sobre a [TMDB API](https://developer.themoviedb.org/docs). Implementação da **Opção A** do desafio técnico para a vaga de Desenvolvedor React Pleno.

A aplicação simula a ferramenta interna de um curador de catálogo de streaming: descobrir filmes em alta, filtrar por gênero/ano/rating, abrir uma página de detalhes com elenco e trailer, e montar uma watchlist persistida localmente.

## Pré-requisitos

| Ferramenta | Versão sugerida |
| --- | --- |
| Node.js | `>= 20.x` (testado em `20.11`) |
| npm | `>= 10.x` (vem com o Node 20) |
| Conta TMDB | gratuita, necessária só para gerar o token de leitura |

## Setup

### 1. Clonar e instalar

```bash
git clone <url-do-fork>
cd cinedash-inbazz
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (mesmo nível do `package.json`) com:

```
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=<seu_read_access_token_v4>
```

O `VITE_TMDB_API_KEY` é o **Read Access Token (v4)** disponível em [TMDB → Settings → API](https://www.themoviedb.org/settings/api). O cliente HTTP usa esse token como `Bearer` — não confunda com a "API Key (v3)".

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

A aplicação sobe em `http://localhost:5173`. O Vite faz hot reload automaticamente. Use `Ctrl+C` para encerrar.

A primeira tela é o `/login`. Como não existe backend, qualquer email válido + senha com mais de 6 caracteres autentica e gera um token fictício persistido em `localStorage`. Após o login você é redirecionado para `/movies`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe o dev server do Vite com HMR. |
| `npm run build` | Faz typecheck (`tsc -b`) e gera o bundle de produção em `dist/`. |
| `npm run preview` | Serve o `dist/` localmente para validar o build de produção. |
| `npm run lint` | Roda ESLint em todo o repositório. |
| `npm test` | Executa a suite de testes (Vitest) uma única vez. Use no CI. |
| `npm run test:watch` | Vitest em modo watch para TDD. |

## Estrutura

A organização segue **Feature-Sliced Design**. O detalhamento das decisões está em [`ARCHITECTURE.md`](./ARCHITECTURE.md).

```
src/
├─ app/         # bootstrap, providers, layout raiz
├─ pages/       # rotas (login, dashboard, watchlist, movie-details)
├─ widgets/     # composições grandes de UI (header, tabela, hero do filme…)
├─ features/    # capacidades autocontidas (auth, watchlist, filtros, tema)
├─ entities/    # modelos de domínio (movie, genre) + chamadas à TMDB
└─ shared/      # primitivos reutilizáveis (UI, toast, utils, http client)
```

## Testes

A stack é **Vitest + Testing Library + jsdom**. Foram priorizados testes de regras de negócio e fluxos de UI relevantes em vez de cobertura por cobertura — esquema de validação do login (Zod), store da watchlist (Zustand persist), construção das colunas da TanStack Table, comportamento da paginação, renderização do empty state e ordenação da tabela de filmes.

```bash
npm test                # roda tudo (CI)
npm run test:watch      # modo interativo
```

## Build de produção

```bash
npm run build
npm run preview         # opcional: validar localmente
```

O bundle final é minificado pelo esbuild (via Vite). O `tsc -b` roda **antes** do bundle para garantir que erros de tipo quebrem o build — o projeto está em `strict` mode.


## Deploy em produção

Publiquei o projeto em um domínio gratuito para que seja possível avaliar sem se restringir a ser somente localmente. Segue o link: <a href="https://react-frontend-challenge-rouge.vercel.app/">Aplicação no ar</a>
