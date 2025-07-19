<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


enum DbWhereOpTxt
{
    case LIKE_PREFIX;
    case LIKE_SUFFIX;
    case LIKE_SUBSTR;
}
