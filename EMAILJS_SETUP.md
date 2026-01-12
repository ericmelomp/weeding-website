# Configuração do EmailJS

Este guia explica como configurar o envio de emails para receber as confirmações de presença.

## 📧 Configuração do EmailJS

### Passo 1: Criar conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crie uma conta gratuita (plano gratuito permite até 200 emails/mês)

### Passo 2: Configurar serviço de email

1. No painel do EmailJS, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta de email
5. Anote o **Service ID** (ex: `service_xxxxx`)

### Passo 3: Criar/Configurar template de email

1. Vá em **Email Templates**
2. Clique no template `template_9dqwxqj` (ou crie um novo)
3. Clique em **"Edit Content"**
4. ⚠️ **Use o Code Editor (editor de código)**, NÃO o Design Editor
5. Configure o template:

**To Email:**
```
ericmelomp@gmail.com
```

**Subject:**
```
Casamento - Confirmação de Presença
```

**Content (HTML):**
```
{{{message_html}}}
```

⚠️ **IMPORTANTE:** Use **TRÊS chaves** `{{{message_html}}}` (não duas!).
As três chaves indicam ao EmailJS que o conteúdo é HTML e deve ser renderizado, não exibido como texto.

⚠️ **IMPORTANTE:** 
- O campo **Content** deve ter **APENAS** `{{{message_html}}}` (com TRÊS chaves, não duas!)
- O campo deve estar configurado como **HTML** (não texto simples)
- **NÃO** use variáveis como `{{name}}`, `{{time}}`, `{{message}}` - elas não funcionarão
- O código JavaScript já gera todo o HTML formatado e envia via `message_html`
- Use `{{{message_html}}}` (três chaves) para renderizar HTML, não `{{message_html}}` (duas chaves)

4. Salve o template

### Passo 4: Obter Public Key

1. Vá em **Account** → **General**
2. Copie sua **Public Key**

### Passo 5: Configurar no código

✅ **As configurações já estão aplicadas no código!**

As seguintes configurações já estão configuradas no `script.js`:
- Public Key: `RUCANfHn1ROI5Gq5X`
- Service ID: `service_2eu69yh`
- Template ID: `template_9dqwxqj`

O sistema está pronto para enviar emails para: **ericmelomp@gmail.com**

## 📝 Variáveis do Template

O código envia a variável `message_html` que já contém **TODO o HTML formatado** do email.

⚠️ **IMPORTANTE:** O template deve usar **APENAS** `{{{message_html}}}` (com TRÊS chaves) no campo Content.

**NÃO use outras variáveis** como `{{nome}}`, `{{presenca}}`, etc. no template, pois elas não funcionarão. Todo o conteúdo já está formatado dentro do HTML enviado via `message_html`.

**Por que três chaves?**
- `{{variable}}` (duas chaves) = texto simples (HTML será escapado)
- `{{{variable}}}` (três chaves) = HTML (será renderizado como HTML)

## ✅ Teste

Após configurar:

1. Acesse a página de RSVP
2. Preencha e envie o formulário
3. Verifique se o email chegou em `ericmelomp@gmail.com`

## 🔒 Segurança

- A Public Key pode ser exposta no código (é segura)
- Nunca exponha sua Private Key
- O plano gratuito tem limite de 200 emails/mês

## 📧 Email de Destino

O email será enviado para: **ericmelomp@gmail.com**

---

**Dúvidas?** Consulte a documentação do EmailJS: https://www.emailjs.com/docs/
