<?php declare(strict_types=1);

namespace Navplan\User;


$postArgs = json_decode(file_get_contents('php://input'), TRUE);
$config = new UserConfigProd();
UserServiceProcessor::processRequest($postArgs, $config);
