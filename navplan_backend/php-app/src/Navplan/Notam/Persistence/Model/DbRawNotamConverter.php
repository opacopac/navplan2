<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Model;

use Navplan\Notam\Domain\Model\RawNotam;
use Navplan\System\Db\Domain\Model\DbEntityConverter;


class DbRawNotamConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableNotam $table)
    {
    }


    /**
     * @param array $row
     * @return RawNotam
     */
    public function fromDbRow(array $row): RawNotam
    {
        $r = new DbRowNotam($this->table, $row);

        return new RawNotam(
            $r->getId(),
            $r->getNotamId(),
            $r->getCountry(),
            $r->getType(),
            $r->getIcao(),
            $r->getNotam()
        );
    }
}
