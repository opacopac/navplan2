<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;

interface IDbCondGeoBuilder
{
    function condition(DbCondGeo $cond);

    function build(): string;
}
