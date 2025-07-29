<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbCondText;

interface IDbCondTextBuilder
{
    function condition(DbCondText $cond): IDbCondTextBuilder;

    function build(): string;
}
