<?php declare(strict_types=1);

namespace Navplan\Common\Persistence\Model;

use Navplan\Common\Domain\Model\Timestamp;


class DbTimestampConverter
{
    /**
     * @param array $row
     * @param string $colName
     * @return Timestamp
     */
    public static function fromDbRow(array $row, string $colName): Timestamp
    {
        return Timestamp::fromS(strtotime($row[$colName]));
    }
}
