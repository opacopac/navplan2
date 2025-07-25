<?php
require_once __DIR__ . "/Navplan/Db/MySqlDb/DbService.php";

use Navplan\System\Db\MySql\DbService;


// TODO: show errors on web page
//error_reporting(E_ALL);
ini_set('display_errors', '1');


//region DATABASE

function openDb()
{
    return DbService::openDb();
    /*global $db_host, $db_user, $db_pw, $db_name;

    // open db connection
    $conn = new mysqli($db_host, $db_user, $db_pw, $db_name);
    $conn->set_charset("utf8");

    return $conn;*/
}

//endregion


//region VALIDATORS

function checkNumeric($num)
{
    if (!is_numeric($num))
        die("format error: '" . $num . "' is not numeric");

    return $num;
}


function checkString($string, $minlen, $maxlen)
{
    if (isset($maxlen) && strlen($string) > $maxlen)
        die("format error: string '" . $string . "' too long");

    if (isset($minlen) && strlen($string) < $minlen)
        die("format error: string '" . $string . "' too short");

    return $string;
}


function checkEmail($email)
{
    if (!$email)
        die("email is null");

    // TODO: check email format with regexp
    return checkString($email, 1, 100);
}


function checkToken($token)
{
    if (!$token)
        die("token is null");

    return checkString($token, 1, 100);
}


function checkId($id)
{
    if (!is_numeric($id))
        die("format error");

    if ($id < 0 || $id > 4294967295)
        die("format error");

    return $id;
}


function checkEscapeString($conn, $string, $minlen, $maxlen)
{
    return mysqli_real_escape_string($conn, checkString($string, $minlen, $maxlen));
}


function checkEscapeEmail($conn, $email)
{
    return mysqli_real_escape_string($conn, checkEmail($email));
}


function checkEscapeToken($conn, $token)
{
    return mysqli_real_escape_string($conn, checkToken($token));
}

//endregion


//region TIME

function getIsoTimeString($timestamp = null)
{
    if (!$timestamp)
        $timestamp = time();

    return gmdate('Ymd\Th:i:s\Z', $timestamp);
}

//endregion


//region STRINGS

function array_implode($glue, $separator, $array)
{
    if (!is_array($array))
        return $array;

    $string = array();
    foreach ($array as $key => $val) {
        if (is_array($val))
            $val = implode(',', $val);

        $string[] = "{$key}{$glue}{$val}";
    }

    return implode($separator, $string);
}

//endregion


function printLine($text)
{
    if ($text)
        print $text;

    print "<br>\n";
    ob_flush();
}

