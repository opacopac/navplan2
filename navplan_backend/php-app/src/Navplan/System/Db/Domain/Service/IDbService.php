<?php declare(strict_types=1);

namespace Navplan\System\Db\Domain\Service;

use Navplan\System\Db\Domain\Model\IDbResult;
use Navplan\System\Db\Domain\Model\IDbStatement;
use Navplan\System\Db\MySql\DbCredentials;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbDeleteCommandBuilder;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbInsertCommandBuilder;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbQueryBuilder;


interface IDbService
{
    function init2(DbCredentials $credentials);

    // TODO: remove
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

    function getQueryBuilder(): IDbQueryBuilder;

    function getInsertCommandBuilder(): IDbInsertCommandBuilder;

    function getDeleteCommandBuilder(): IDbDeleteCommandBuilder;
}
