<?php declare(strict_types=1);

namespace Navplan\Shared;


interface IDbService {
    public function init(string $db_host, string $db_user, string $db_pw, string $db_name);

    public function openDb();

    public function closeDb();

    public function escapeString(string $escapeString): string;

    public function execSingleResultQuery(string $query, bool $allowZeroResults, string $errorMessage): IDbResult;

    public function execMultiResultQuery(string $query, string $errorMessage): IDbResult;

    public function execCUDQuery(string $query, string $errorMessage): bool;

    public function getInsertId(): int;
}
