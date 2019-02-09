<?php namespace Navplan\Shared;
use http\Exception\InvalidArgumentException;

require_once __DIR__ . "/../NavplanHelper.php";


class StringNumberService
{
    /***
     * @param $num
     * @return mixed
     * @throws InvalidFormatException
     */
    public static function checkNumeric($num)
    {
        if (!is_numeric($num))
            throw new InvalidFormatException("format error: '" . $num . "' is not numeric");

        return $num;
    }


    /***
     * @param string $string
     * @param int $minlen
     * @param int $maxlen
     * @return string
     * @throws InvalidFormatException
     */
    public static function checkString(string $string, int $minlen, int $maxlen): string
    {
        if (isset($maxlen) && strlen($string) > $maxlen)
            throw new InvalidFormatException("format error: string '" . $string . "' too long");

        if (isset($minlen) && strlen($string) < $minlen)
            throw new InvalidFormatException("format error: string '" . $string . "' too short");

        return $string;
    }


    /***
     * @param string $string
     * @param int $minlen
     * @param int $maxlen
     * @return string
     * @throws InvalidFormatException
     */
    public static function checkAlphaNumeric(string $string, int $minlen, int $maxlen): string
    {
        $pattern = "/[a-zA-Z0-9]/";

        if (!$string)
            throw new InvalidFormatException("format error: string is null");

        if (!preg_match($pattern, $string))
            throw new InvalidFormatException("format error: string '" . $string . "' is not alphanumeric");

        return self::checkString($string, $minlen, $maxlen);
    }


    /***
     * @param string $filename
     * @return string
     * @throws InvalidFormatException
     */
    public static function checkFilename(string $filename): string
    {
        $pattern = '/^[a-zA-Z0-9]+[a-zA-Z0-9_\-]*\.[a-zA-Z0-9]+$/';

        if (!$filename)
            throw new InvalidFormatException("format error: empty string");

        if (!preg_match($pattern, $filename))
            throw new InvalidFormatException("format error: string '" . $filename . "' is not a filename");

        return self::checkString($filename, 1, 50);
    }


    /***
     * @param string $email
     * @return string
     * @throws InvalidFormatException
     */
    public static function checkEmail(string $email): string
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
            throw new InvalidFormatException("format error: not an email");

        return self::checkString($email, 1, 100);
    }


    /***
     * @param string $token
     * @return string
     * @throws InvalidFormatException
     */
    public static function checkToken(string $token): string
    {
        if (!$token)
            throw new InvalidFormatException("token is null");

        return self::checkString($token, 1, 2000);
    }


    /***
     * @param int $id
     * @return int
     * @throws InvalidFormatException
     */
    public static function checkId(int $id): int
    {
        if (!is_numeric($id))
            throw new InvalidFormatException("format error");

        if ($id < 0 || $id > 4294967295)
            throw new InvalidFormatException("format error");

        return $id;
    }


    /**
     * @param IDbService $dbService
     * @param string $string
     * @param int $minlen
     * @param int $maxlen
     * @return string
     * @throws InvalidFormatException
     */
    public static function checkEscapeAlphaNumeric(IDbService $dbService, string $string, int $minlen, int $maxlen): string
    {
        return $dbService->escapeString((self::checkAlphaNumeric($string, $minlen, $maxlen)));
    }



    /**
     * @param IDbService $dbService
     * @param string $string
     * @param int $minlen
     * @param int $maxlen
     * @return string
     * @throws InvalidFormatException
     */
    public static function checkEscapeString(IDbService $dbService, string $string, int $minlen, int $maxlen): string
    {
        return $dbService->escapeString(self::checkString($string, $minlen, $maxlen));
    }


    /**
     * @param IDbService $dbService
     * @param string $email
     * @return string
     * @throws InvalidFormatException
     */
    public static function checkEscapeEmail(IDbService $dbService, string $email): string
    {
        return $dbService->escapeString(self::checkEmail($email));
    }


    /***
     * @param int $len
     * @return string
     */
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


    /***
     * @param int $number
     * @param int $digits
     * @return string
     */
    public static function zeroPad(int $number, int $digits): string
    {
        $numstr = '' . $number;

        while(strlen($numstr) < $digits)
            $numstr = "0" . $numstr;

        return $numstr;
    }


    /***
     * @param string $glue
     * @param string $separator
     * @param array $array
     * @return string
     * @throws InvalidArgumentException
     */
    public static function array_implode(string $glue, string $separator, array $array): string
    {
        if (!is_array($array))
            throw new InvalidArgumentException('ERROR: input is not an array');

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
