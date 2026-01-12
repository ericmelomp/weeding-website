# ⚠️ CONFIGURAÇÃO IMPORTANTE DO TEMPLATE

## Como corrigir o email vazio ou HTML sendo exibido como texto

O template do EmailJS precisa ter **APENAS** a variável `{{{message_html}}}` (com TRÊS chaves) no campo **Content**.

### Passo a passo:

1. Acesse o EmailJS: https://www.emailjs.com/
2. Vá em **Email Templates**
3. Clique no template `template_9dqwxqj`
4. Clique no botão **"Edit Content"** (botão com ícone de lápis, no canto direito)
5. ⚠️ **IMPORTANTE:** Use o **Code Editor** (editor de código), NÃO o Design Editor
   - Procure por um botão/toggle que permite alternar entre "Design" e "Code"
   - Escolha "Code" ou "Code Editor"
6. No Code Editor, você verá algo como `{{message}}` ou outras variáveis
7. **DELETE TODO O CONTEÚDO ATUAL**
8. Cole **APENAS** isso:

```
{{{message_html}}}
```

⚠️ **Use TRÊS chaves** `{{{` e `}}}` em vez de duas!

9. Certifique-se que está usando **HTML** (não texto simples)
10. Clique em **"Save"** ou **"Salvar"**
11. Feche o editor

**Nota:** 
- Se você está vendo `{{message}}` no template, precisa substituir por `{{{message_html}}}` (com TRÊS chaves)
- O código JavaScript envia a variável `message_html`, não `message`
- Use **TRÊS chaves** `{{{message_html}}}` para renderizar HTML, não duas!

### Configuração completa do template:

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

**IMPORTANTE:**
- O campo Content deve ter **APENAS** `{{{message_html}}}` (com TRÊS chaves, não duas!)
- O campo deve estar configurado como **HTML** (não texto)
- Não adicione texto extra ou outras variáveis
- Use `{{{message_html}}}` (três chaves) para renderizar HTML, não `{{message_html}}` (duas chaves)

### Por que isso é necessário?

O código JavaScript já gera todo o HTML formatado e bonito e envia através da variável `message_html`. 

⚠️ **O template do EmailJS precisa usar `{{{message_html}}}` (TRÊS chaves) para renderizar HTML!**

**Por que três chaves?**
- `{{variable}}` (duas chaves) = texto simples (HTML será escapado/exibido como texto)
- `{{{variable}}}` (três chaves) = HTML (será renderizado como HTML formatado)

Se você usar `{{message_html}}` (duas chaves), o HTML será exibido como texto puro.
Se você usar outras variáveis como `{{name}}`, `{{time}}`, `{{message}}`, o email ficará vazio porque essas variáveis não estão sendo enviadas pelo código JavaScript.

---

Após fazer essa alteração, teste novamente o formulário RSVP. O email deve chegar formatado e bonito!
