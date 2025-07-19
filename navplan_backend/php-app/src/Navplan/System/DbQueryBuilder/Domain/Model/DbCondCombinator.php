<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


enum DbCondCombinator
{
    case AND;
    case OR;
}
