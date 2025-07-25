<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Model;

use Navplan\System\Db\Domain\Model\DbEntityConverter;
use Navplan\Webcam\Domain\Model\Webcam;


/**
 * @extends DbEntityConverter<Webcam>
 */
class DbWebcamConverter extends DbEntityConverter
{
    public function __construct(private readonly DbTableWebcam $table)
    {
    }


    public function fromDbRow(array $row): Webcam
    {
        $r = new DbRowWebcam($this->table, $row);

        return new Webcam(
            $r->getName(),
            $r->getUrl(),
            $r->getPosition(),
            $r->getAirportIcao()
        );
    }
}
