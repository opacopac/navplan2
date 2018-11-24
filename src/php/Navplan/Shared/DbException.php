<?php namespace Navplan\Shared;

use Exception;


class DbException extends Exception
{
    public function __construct(string $message, string $error, string $query)
    {
        parent::__construct($message . ": " . $error . " query:" . $query);
    }
}
