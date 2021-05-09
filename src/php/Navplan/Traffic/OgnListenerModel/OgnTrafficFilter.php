<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerModel;

use Navplan\Common\DomainModel\Extent2d;


class OgnTrafficFilter {
    public function __construct(
        public Extent2d $extent,
        public int $timestamp,
    ) {
    }


    public function equals(OgnTrafficFilter $filter, bool $ignoreTimestamp = true): bool {
        return $this->extent->equals($filter->extent) && ($this->timestamp === $filter->timestamp || $ignoreTimestamp === true);
    }
}
