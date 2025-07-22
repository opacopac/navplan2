<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbRow
{
    public function __construct(public array $row)
    {
    }
}
