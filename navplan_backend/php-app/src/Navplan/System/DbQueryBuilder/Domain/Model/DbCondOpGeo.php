<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


enum DbCondOpGeo
{
    case INTERSECTS_ST;
    case INTERSECTS_MBR;
}
