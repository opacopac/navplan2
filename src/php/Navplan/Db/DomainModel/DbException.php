<?php declare(strict_types=1);

namespace Navplan\Db\DomainModel;

use Exception;
use Throwable;


class DbException extends Exception {
    public function __construct(string $message, string $dbError, string $query = 'n/a', int $code = 0, Throwable $previous = NULL) {
        parent::__construct($message . ": " . $dbError . " query:" . $query, $code, $previous);
    }
}
