<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


enum DbWhereOp
{
    case EQ;
    case NE;
    case GT;
    case GT_OR_E;
    case LT;
    case LT_OR_E;
    case LIKE_PREFIX;
    case LIKE_SUFFIX;
    case LIKE_SUBSTR;
}
