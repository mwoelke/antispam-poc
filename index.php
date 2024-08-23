<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <script src="script.js"></script>
    <script src="pow.js"></script>
    <link rel="stylesheet" href="node_modules/material-icons/iconfont/material-icons.woff2">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">

<form action="form_receive.php" method="post">
    <label for="first_name">First name *</label>
    <input class="form-control" type="text" name="first_name" id="first_name" required>

    <label for="last_name">Family name *</label>
    <input class="form-control" type="text" name="last_name" id="last_name" required>

    <label for="address">Address *</label>
    <input class="form-control" type="text" name="address" id="address" required>

    <label for="message">Your message *</label>
    <textarea name="message" id="message" class="form-control" required></textarea>
    <br>

    <input type="checkbox" id="form1-pow-button" name="form1-pow-button" class="mt-2 btn-primary pow-button" required>
    <label for="form1-pow-button" id="form1-pow-button-label">I am not a robot 🤖 *</label>

    <br>
    <p><small>* Required fields</small>
    </p>
    <br>

    <input type="submit" class="btn mt-2 btn-primary">

    <input style="display: none; visibility: hidden;" name="second-email-check" type="text" class="form-control">

    <input type="hidden" name="pow" id="form1-pow">
</form>

<br>

<p>Argon2 output</p>
<pre> - </pre>

<br>

<table>
    <tr>
        <th>Variable</th>
        <th>Wert</th>
    </tr>
    <tr>
        <td>$_SERVER['HTTP_HOST']</td>
        <td><?= $_SERVER['HTTP_HOST'] ?></td>
    </tr>
    <tr>
        <td>$_SERVER['REMOTE_ADDR']</td>
        <td><?= $_SERVER['REMOTE_ADDR'] ?></td>
    </tr>
    <tr>
        <td>$_SERVER['HTTP_X_FORWARDED_FOR']</td>
        <td><?= $_SERVER['HTTP_X_FORWARDED_FOR'] ?></td>
    </tr>
    <tr>
        <td>$_SERVER['HTTP_CLIENT_IP']</td>
        <td><?= $_SERVER['HTTP_CLIENT_IP'] ?></td>
    </tr>

</table>

</div>

</body>
</html>
