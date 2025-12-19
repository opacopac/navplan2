<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCondRaw;

interface IDbCondRawBuilder
{
    function condition(DbCondRaw $cond): IDbCondRawBuilder;

    function build(): string;
}
