# Formulário de contato sem JavaScript — A Carioca

## Opção 1 — `mailto:`

A opção mais simples não usa serviço externo. O formulário abre o aplicativo de e-mail do visitante e monta uma mensagem para a equipe. É adequado para uma primeira versão, mas depende de o visitante ter um aplicativo de e-mail configurado.

```html
<section class="contact-section" id="contato">
  <div class="content-width">
    <p class="section-kicker">FALE COM A A CARIOCA</p>
    <h2>Vamos conversar sobre<br><em>o seu negócio.</em></h2>

    <form class="contact-form" action="mailto:comercial@acarioca.com.br" method="post" enctype="text/plain">
      <label for="nome">Seu nome</label>
      <input id="nome" name="Nome" type="text" required>

      <label for="empresa">Nome da empresa</label>
      <input id="empresa" name="Empresa" type="text" required>

      <label for="email">Seu e-mail</label>
      <input id="email" name="E-mail" type="email" required>

      <label for="plano">Plano de interesse</label>
      <select id="plano" name="Plano de interesse">
        <option value="Presença">Presença</option>
        <option value="Destaque">Destaque</option>
        <option value="Protagonista">Protagonista</option>
        <option value="Ainda não sei">Ainda não sei</option>
      </select>

      <label for="mensagem">Como podemos ajudar?</label>
      <textarea id="mensagem" name="Mensagem" rows="5"></textarea>

      <button class="button button-primary" type="submit">Enviar por e-mail</button>
    </form>
  </div>
</section>
```

O ponto negativo é a dependência do programa de e-mail do visitante. Em celulares e computadores sem cliente de e-mail configurado, a experiência pode não funcionar como esperado.

## Opção 2 — FormSubmit, sem JavaScript

Para o Cloudflare Pages, uma alternativa prática é o [FormSubmit](https://formsubmit.co/). Ele recebe o formulário via HTML e encaminha os dados para o e-mail informado, sem exigir backend próprio ou JavaScript. Antes do primeiro uso, será necessário confirmar o endereço de e-mail por meio da mensagem enviada pelo serviço.

Substitua o `action` do formulário por este endereço e mantenha o método `POST`:

```html
<form class="contact-form" action="https://formsubmit.co/comercial@acarioca.com.br" method="POST">
  <input type="hidden" name="_subject" value="Novo contato pelo site A Carioca">
  <input type="hidden" name="_next" value="https://SEU-DOMINIO.com.br/obrigado.html">
  <input type="hidden" name="_captcha" value="true">

  <label for="nome">Seu nome</label>
  <input id="nome" name="name" type="text" required>

  <label for="empresa">Nome da empresa</label>
  <input id="empresa" name="empresa" type="text" required>

  <label for="email">Seu e-mail</label>
  <input id="email" name="email" type="email" required>

  <label for="plano">Plano de interesse</label>
  <select id="plano" name="plano">
    <option value="Presença">Presença</option>
    <option value="Destaque">Destaque</option>
    <option value="Protagonista">Protagonista</option>
    <option value="Ainda não sei">Ainda não sei</option>
  </select>

  <label for="mensagem">Como podemos ajudar?</label>
  <textarea id="mensagem" name="message" rows="5"></textarea>

  <button class="button button-primary" type="submit">Enviar mensagem</button>
</form>
```

Crie também uma página simples chamada `obrigado.html` para o redirecionamento após o envio:

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mensagem enviada — A Carioca</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="success-page">
    <p class="section-kicker">A CARIOCA</p>
    <h1>Recebemos sua mensagem.</h1>
    <p>Nossa equipe entrará em contato assim que possível.</p>
    <a class="button button-primary" href="index.html">Voltar para o site</a>
  </main>
</body>
</html>
```

## Recomendação para a fase atual

Para testar rapidamente, use `mailto:`. Para uma experiência mais profissional, sem criar backend, use um serviço de formulário como o FormSubmit. Antes de colocar o formulário em produção, revise a política de privacidade, informe ao visitante como os dados serão utilizados e faça um teste real de recebimento.

Nunca coloque senhas, tokens privados ou chaves de API no HTML. Também evite incluir dados pessoais desnecessários no formulário.
