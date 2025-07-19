<?php
require_once __DIR__ . "/Navplan/Db/MySqlDb/DbService.php";

use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\Db\MySql\DbService;


// TODO: show errors on web page
//error_reporting(E_ALL);
ini_set('display_errors', '1');


const TMP_DIR_BASE = '../tmp/';
const TMP_DIR_PREFIX = 'tmpdl_';
const TMP_DIR_TIMEOUT_SEC = 300;


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


function getDbTimeString($timestamp)
{
    return DbHelper::getDbUtcTimeString($timestamp);
}


function getDbPolygonString($lonLatList)
{
    return DbHelper::getDbPolygonString($lonLatList);
}


function getDbMultiPolygonString($polygonList)
{
    return DbHelper::getDbMultiPolygonString($polygonList);
}

//endregion


//region TEMP FILES

function createTempDir()
{
    cleanUpTempDirs();

    $tmpDir = TMP_DIR_PREFIX . createRandomString(20);
    mkdir(TMP_DIR_BASE . $tmpDir);

    return $tmpDir;
}


function cleanUpTempDirs()
{
    $tmpDirEntries = scandir(TMP_DIR_BASE);

    // iterate trough tmp dirs
    foreach ($tmpDirEntries as $tmpDir)
    {
        $tmpDirPath = TMP_DIR_BASE . $tmpDir;

        if (!is_dir($tmpDirPath) || strpos($tmpDir, TMP_DIR_PREFIX) !== 0)
            continue;

        // check if too old
        if (filemtime($tmpDirPath) > time() - TMP_DIR_TIMEOUT_SEC)
            continue;

        // iterate trough files of temp dir
        $innerDirEntries = scandir($tmpDirPath);

        foreach ($innerDirEntries as $tmpFile)
        {
            if ($tmpFile == '.' || $tmpFile == '..')
                continue;

            $tmpFilePath = $tmpDirPath . "/" . $tmpFile;

            if (!unlink($tmpFilePath))
                die("ERROR: while deleting temp file '" . $tmpFilePath . "'");
        }

        // remove tmp dir
        if (!rmdir($tmpDirPath))
            die("ERROR: while deleting temp dir '" . $tmpDirPath . "'");
    }
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


function checkFilename($string)
{
    $pattern = '/^[a-zA-Z0-9]+[a-zA-Z0-9_\-]*\.[a-zA-Z0-9]+$/';

    if (!$string)
        die("format error: empty string");

    if (!preg_match($pattern, $string))
        die("format error: string '" . $string . "' is not a filename");

    return checkString($string, 1, 50);
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

function createRandomString($len)
{
    $result = "";
    $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    $charArray = str_split($chars);
    for($i = 0; $i < $len; $i++)
	{
	    $randItem = array_rand($charArray);
	    $result .= "" . $charArray[$randItem];
    }
    return $result;
}


function array_implode($glue, $separator, $array)
{
    if (!is_array($array))
        return $array;

    $string = array();
    foreach ($array as $key => $val)
    {
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


function isSelf($email)
{
    return ($email == "armand@tschanz.com");
}
