<?php declare(strict_types=1);

namespace Navplan\Shared;

use Exception;


class DbException extends Exception {
    public function __construct(string $message, string $error, string $query) {
        parent::__construct($message . ": " . $error . " query:" . $query);
    }
}
