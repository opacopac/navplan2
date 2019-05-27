<?php declare(strict_types=1);

namespace Navplan\Notam\Rest;


use Navplan\Notam\Domain\Notam;

class NotamRest {
    public static function toArray(Notam $notam): array {
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
            "geometry" => NotamGeometryRest::toArray($notam->geometry)
        );
    }
}
