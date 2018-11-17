<?php namespace Navplan\Shared;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;


class StringNumberService
{
    public static function checkNumeric($num)
    {
        if (!is_numeric($num))
            die("format error: '" . $num . "' is not numeric");

        return $num;
    }


    public static function checkString(string $string, int $minlen, int $maxlen): string
    {
        if (isset($maxlen) && strlen($string) > $maxlen)
            die("format error: string '" . $string . "' too long");

        if (isset($minlen) && strlen($string) < $minlen)
            die("format error: string '" . $string . "' too short");

        return $string;
    }


    public static function checkAlphaNumeric(string $string, int $minlen, int $maxlen): string
    {
        $pattern = "/[a-zA-Z0-9]/";

        if (!$string)
            die("format error: string is null");

        if (!preg_match($pattern, $string))
            die("format error: string '" . $string . "' is not alphanumeric");

        return self::checkString($string, $minlen, $maxlen);
    }

    public static function checkFilename(string $filename): string
    {
        $pattern = '/^[a-zA-Z0-9]+[a-zA-Z0-9_\-]*\.[a-zA-Z0-9]+$/';

        if (!$filename)
            die("format error: empty string");

        if (!preg_match($pattern, $filename))
            die("format error: string '" . $filename . "' is not a filename");

        return self::checkString($filename, 1, 50);
    }



    public static function checkEmail(string $email): string
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
            die("format error: not an email");

        return self::checkString($email, 1, 100);
    }


    public static function checkToken(string $token): string
    {
        if (!$token)
            die("token is null");

        return self::checkString($token, 1, 2000);
    }


    public static function checkId(int $id): int
    {
        if (!is_numeric($id))
            die("format error");

        if ($id < 0 || $id > 4294967295)
            die("format error");

        return $id;
    }


    public static function checkEscapeAlphaNumeric(mysqli $conn, string $string, int $minlen, int $maxlen): string
    {
        return mysqli_real_escape_string($conn, self::checkAlphaNumeric($string, $minlen, $maxlen));
    }


    public static function checkEscapeString(mysqli $conn, string $string, int $minlen, int $maxlen): string
    {
        return mysqli_real_escape_string($conn, self::checkString($string, $minlen, $maxlen));
    }


    public static function checkEscapeEmail(mysqli $conn, string $email): string
    {
        return mysqli_real_escape_string($conn, self::checkEmail($email));
    }


    public static function createRandomString(int $len): string
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


    public static function zeroPad(int $number, int $digits): string
    {
        $numstr = '' . $number;

        while(strlen($numstr) < $digits)
            $numstr = "0" . $numstr;

        return $numstr;
    }


    public static function array_implode(string $glue, string $separator, array $array): string
    {
        if (!is_array($array))
            die('ERROR: input is not an array');

        $string = array();
        foreach ($array as $key => $val)
        {
            if (is_array($val))
                $val = implode(',', $val);

            $string[] = "{$key}{$glue}{$val}";
        }

        return implode($separator, $string);
    }
}
