<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


enum DbWhereOpGeo
{
    case INTERSECTS_ST;
    case INTERSECTS_MBR;
}
