type WelcomeTemplateProps = {
  name: string;
  schoolName: string;
};
export const WelcomeTemplate = ({ schoolName, name }: WelcomeTemplateProps) => `
<!DOCTYPE html>
<html>
<head>
    <title>Boas-vindas à ${schoolName}}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #007BFF;
            color: white;
        }
        .content {
            padding: 20px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #007BFF;
            color: white;
        }
        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #007BFF;
            border: none;
            text-decoration: none;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Boas-vindas à ${schoolName}</h1>
        </div>
        <div class="content">
            <p>Olá, ${name},</p>
            <p>Obrigado por se juntar à nossa comunidade! Estamos ansiosos para oferecer a você conteúdo exclusivo e evoluir seu inglês.</p>
            <p>Para começar, clique no botão a baixo para definir sua senha</p>
            <a href="[LINK DO SEU SITE]" class="cta-button">Gerar senha</a>
        </div>
        <div class="footer">
            <p>Atenciosamente,</p>
            <p>${schoolName}</p>
        </div>
    </div>
</body>
</html>
`;
