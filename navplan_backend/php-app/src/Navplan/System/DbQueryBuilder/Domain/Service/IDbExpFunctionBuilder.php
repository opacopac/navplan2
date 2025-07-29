<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbExpFunction;

interface IDbExpFunctionBuilder
{
    function expression(DbExpFunction $exp): IDbExpFunctionBuilder;

    function build(): string;
}
