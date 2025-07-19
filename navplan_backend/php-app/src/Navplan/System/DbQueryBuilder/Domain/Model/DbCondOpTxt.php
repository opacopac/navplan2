<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


enum DbCondOpTxt
{
    case LIKE_PREFIX;
    case LIKE_SUFFIX;
    case LIKE_SUBSTR;
}
