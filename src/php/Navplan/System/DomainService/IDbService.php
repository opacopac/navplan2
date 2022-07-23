<?php declare(strict_types=1);

namespace Navplan\System\DomainService;

use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainModel\IDbStatement;


interface IDbService {
    function init(string $db_host, string $db_user, string $db_pw, string $db_name);

    function openDb();

    function closeDb();

    function escapeString(string $escapeString): string;

    function escapeAndQuoteString(string $escapeString): string;

    function escapeAndQuoteStringOrNull(?string $escapeString): string;

    function execSingleResultQuery(string $query, bool $allowZeroResults, string $errorMessage): IDbResult;

    function execMultiResultQuery(string $query, string $errorMessage): IDbResult;

    function execCUDQuery(string $query, string $errorMessage): bool;

    function getInsertId(): int;

    function prepareStatement(string $query): IDbStatement;
}
