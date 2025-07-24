<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


enum DbColType
{
    case BOOL;
    case INT;
    case DOUBLE;
    case STRING;
    case TIMESTAMP;
    case GEO_POINT;
    case GEOMETRY;
}
