<?php declare(strict_types=1);

namespace Navplan\Notam\RestModel;


use Navplan\Notam\DomainModel\Notam;

class NotamConverter {
    public static function toRest(Notam $notam): array {
        return array(
            "id" => $notam->id,
            "statecode" => $notam->stateCode,
            "statename" => $notam->stateName,
            "notamid" => $notam->notamId,
            "entity" => $notam->entity,
            "status" => $notam->status,
            "qcode" => $notam->qcode,
            "area" => $notam->area,
            "subarea" => $notam->subarea,
            "condition" => $notam->condition,
            "subject" => $notam->subject,
            "modifier" => $notam->modifier,
            "message" => $notam->message,
            "startdate" => $notam->startdate,
            "enddate" => $notam->enddate,
            "all" => $notam->all,
            "location" => $notam->location,
            "isicao" => $notam->isIcao,
            "created" => $notam->created,
            "key" => $notam->key,
            "type" => $notam->type,
            "geometry" => $notam->geometry ? NotamGeometryConverter::toRest($notam->geometry) : NULL
        );
    }
}
