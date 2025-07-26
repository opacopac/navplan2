<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


enum DbJoinType
{
    case INNER;
    case LEFT;
}
