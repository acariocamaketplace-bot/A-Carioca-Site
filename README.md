# A Carioca — Site estático para Cloudflare Pages

Esta é a versão inicial da presença digital da A Carioca construída apenas com **HTML e CSS**. Não há React, JavaScript, componentes interativos dependentes de scripts ou etapa de build. O pacote pode ser publicado diretamente no Cloudflare Pages como uma pasta estática.

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Página completa, com navegação por âncoras e menu mobile controlado somente por CSS. |
| `style.css` | Identidade visual Orla Editorial, layout responsivo, planos e estados de interação por CSS. |

## Alterações de conteúdo

A antiga área de curadoria foi renomeada para **“Seleção de produtos A Carioca”**. A antiga área de coleções foi substituída por uma seção comercial de planos mensais para lojistas: Presença, Destaque e Protagonista. O plano Protagonista recebe o maior destaque visual e concentra os benefícios mais completos.

Os valores apresentados são uma proposta inicial de comunicação e devem ser confirmados pela empresa antes da publicação definitiva. A seção “Parceiros A Carioca” foi preparada para receber depoimentos reais, desde que revisados e autorizados pelos lojistas; nenhum depoimento fictício foi incluído. Os contatos usam links `mailto:` para funcionar sem backend.

## Publicação no Cloudflare Pages

No Cloudflare Pages, escolha **Create a project**, conecte o repositório ou faça upload direto dos arquivos desta pasta. Como não existe build, deixe o comando de build vazio e use a própria pasta como diretório de publicação. O arquivo `index.html` deve permanecer na raiz do conteúdo publicado.

## Assets

As imagens utilizam URLs persistentes do armazenamento do projeto. Caso o site seja migrado para um ambiente externo, faça o download ou hospede os assets em um CDN próprio e atualize os caminhos no `index.html` e no `style.css`.

## Observação importante

A ausência de JavaScript significa que formulários, busca, login, catálogo dinâmico, checkout e download automático do aplicativo ainda não são funcionalidades implementadas. Nesta fase, os CTAs direcionam para seções internas ou para contato por e-mail, preservando custos e simplicidade operacional.
