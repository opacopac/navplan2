<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbExpText;

interface IDbExpTextBuilder
{
    function expression(DbExpText $exp): IDbExpTextBuilder;

    function build(): string;
}
