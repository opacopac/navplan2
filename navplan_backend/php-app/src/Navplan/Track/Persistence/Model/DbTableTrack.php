<?php declare(strict_types=1);

namespace Navplan\Track\Persistence\Model;


class DbTableTrack
{
    public const TABLE_NAME = "user_tracks";
    public const COL_ID = "id";
    public const COL_ID_USER = "user_id";
    public const COL_NAME = "name";
    public const COL_TIMESTAMP = "timestamp";
    public const COL_POSITIONS = "positions";
}
