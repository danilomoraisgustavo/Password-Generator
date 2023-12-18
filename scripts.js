document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.querySelector('.generate-btn');
    const passwordInput = document.querySelector('.input-box input');
    const copyBtn = document.querySelector('.input-box button');

    // Função para gerar a senha
    function generatePassword() {
        const length = 12; // Comprimento da senha, pode ser ajustado
        const charset = {
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+[]{}'
        };

        let characters = '';
        let password = '';

        if (document.getElementById('lowercase').checked) characters += charset.lowercase;
        if (document.getElementById('uppercase').checked) characters += charset.uppercase;
        if (document.getElementById('numbers').checked) characters += charset.numbers;
        if (document.getElementById('symbols').checked) characters += charset.symbols;
        if (document.getElementById('spaces').checked) characters += ' ';

        if (characters.length === 0) return '';

        for (let i = 0; i < length; i++) {
            let char = characters.charAt(Math.floor(Math.random() * characters.length));
            if (document.getElementById('exc-duplicate').checked && password.includes(char)) {
                i--;
                continue;
            }
            password += char;
        }

        return password;
    }

    // Evento de clique para gerar a senha
    generateBtn.addEventListener('click', function() {
        passwordInput.value = generatePassword();
    });

    // Copiar senha para a área de transferência
    copyBtn.addEventListener('click', function() {
        // Usando a Clipboard API para copiar o texto
        if (passwordInput.value === '') {
            alert('Primeiro gere uma senha!');
        } else {
            navigator.clipboard.writeText(passwordInput.value)
            .then(() => {
                copyBtn.textContent = 'Copiado!';
                setTimeout(() => copyBtn.textContent = 'Copiar', 2000); // Restaura o texto após 2 segundos
            })
            .catch(err => {
                console.error('Erro ao copiar a senha: ', err);
            });
        }
    });
});
