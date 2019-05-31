<?php declare(strict_types=1);

namespace Navplan\Db\MySqlDb;

use mysqli;
use Navplan\Db\Domain\DbException;
use Navplan\Db\IDb\IDbResult;

require_once __DIR__ . "/../../NavplanHelper.php";


class DbService
{
    public static function openDb(): DbConnection
    {
        global $db_host, $db_user, $db_pw, $db_name;

        // open db connection
        $conn = new mysqli($db_host, $db_user, $db_pw, $db_name);
        $conn->set_charset("utf8");

        return new DbConnection($conn);
    }


    /**
     * @param DbConnection $conn
     * @param string $query
     * @param bool $allowZeroResults
     * @param string $errorMessage
     * @return MySqlDbResult
     * @throws DbException
     */
    public static function execSingleResultQuery(DbConnection $conn, string $query, bool $allowZeroResults = true, string $errorMessage = "error executing single result query"): IDbResult {
        $result = $conn->query($query);
        if ($result === FALSE
            || $result->getNumRows() > 1
            || (!$allowZeroResults && $result->getNumRows() == 0)) {
            throw new DbException($errorMessage, $conn->getError(), $query);
        }

        return $result;
    }


    /**
     * @param DbConnection $conn
     * @param string $query
     * @param string $errorMessage
     * @return MySqlDbResult
     * @throws DbException
     */
    public static function execMultiResultQuery(DbConnection $conn, string $query, string $errorMessage = "error executing multi result query"): IDbResult {
        $result = $conn->query($query);
        if ($result === FALSE)
            throw new DbException($errorMessage, $conn->getError(), $query);

        return $result;
    }


    /**
     * @param DbConnection $conn
     * @param string $query
     * @param string $errorMessage
     * @return bool
     * @throws DbException
     */
    public static function execCUDQuery(DbConnection $conn, string $query, string $errorMessage = "error executing query"): bool {
        $result = $conn->query($query);
        if ($result === FALSE)
            throw new DbException($errorMessage, $conn->getError(), $query);

        return $result;
    }
}
