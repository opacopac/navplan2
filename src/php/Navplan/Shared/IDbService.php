<?php declare(strict_types=1);

namespace Navplan\Shared;

require_once __DIR__ . "/../NavplanHelper.php";


interface IDbService {
    public function init(string $db_host, string $db_user, string $db_pw, string $db_name);

    public function openDb(): DbConnection;

    public function closeDb(): bool;

    public function execSingleResultQuery(string $query, bool $allowZeroResults, string $errorMessage): DbResult;

    public function execMultiResultQuery(string $query, string $errorMessage): DbResult;

    public function execCUDQuery(string $query, string $errorMessage): bool;
}
