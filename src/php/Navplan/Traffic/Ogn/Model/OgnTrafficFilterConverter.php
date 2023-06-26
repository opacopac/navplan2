<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Model;

use Navplan\Common\DbModel\DbExtent2dConverter;


class OgnTrafficFilterConverter {
    public static function fromDbRow(array $row): OgnTrafficFilter {
        return new OgnTrafficFilter(
            DbExtent2dConverter::fromDbRow($row),
            strtotime($row["lastModified"])
        );
    }
}
