# 🔧 Como corrigir o HTML sendo exibido como texto

## Problema

O email está sendo enviado, mas o HTML está aparecendo como texto puro (você vê as tags HTML) em vez de ser renderizado como um email formatado.

## Solução

O template do EmailJS precisa usar **chaves triplas** `{{{message_html}}}` em vez de chaves duplas `{{message_html}}` para indicar que o conteúdo é HTML e deve ser renderizado.

### Passo a passo:

1. Acesse o EmailJS: https://www.emailjs.com/
2. Vá em **Email Templates**
3. Clique no template `template_9dqwxqj`
4. Clique no botão **"Edit Content"** (botão com ícone de lápis, no canto direito)
5. ⚠️ **IMPORTANTE:** Use o **Code Editor** (editor de código), NÃO o Design Editor
   - Procure por um botão/toggle que permite alternar entre "Design" e "Code"
   - Escolha "Code" ou "Code Editor"
6. No Code Editor, você verá algo como `{{message_html}}`
7. **SUBSTITUA** por:
   ```
   {{{message_html}}}
   ```
   ⚠️ **Note as TRÊS chaves** `{{{` e `}}}` em vez de duas!

8. Certifique-se que o campo está configurado como **HTML** (não texto simples)
9. Clique em **"Save"** ou **"Salvar"**
10. Feche o editor

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

⚠️ **IMPORTANTE:** 
- Use **TRÊS chaves** `{{{message_html}}}` (não duas!)
- O campo Content deve ter **APENAS** `{{{message_html}}}` (sem outras variáveis)
- O campo deve estar configurado como **HTML** (não texto simples)

### Por que usar três chaves?

No EmailJS:
- `{{variable}}` (duas chaves) = **texto simples** (HTML será escapado/convertido em texto)
- `{{{variable}}}` (três chaves) = **HTML** (será renderizado como HTML)

Como estamos enviando HTML formatado, precisamos usar **três chaves** para que o EmailJS saiba que deve renderizar o HTML em vez de exibi-lo como texto.

---

Após fazer essa alteração, teste novamente o formulário RSVP. O email deve ser renderizado corretamente como HTML formatado! 🎉
