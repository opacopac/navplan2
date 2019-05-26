<?php declare(strict_types=1);

namespace Navplan\User\Domain;

use Navplan\Geometry\Domain\Position2d;


class UserPoint {
    public $id;
    public $type;
    public $name;
    public $position;
    public $remark;
    public $supp_info;


    public function __construct(
        int $id,
        string $type,
        string $name,
        Position2d $position,
        ?string $remark,
        ?string $supp_info
    ) {
        $this->id = $id;
        $this->type = $type;
        $this->name = $name;
        $this->position = $position;
        $this->remark = $remark;
        $this->supp_info = $supp_info;
    }
}
