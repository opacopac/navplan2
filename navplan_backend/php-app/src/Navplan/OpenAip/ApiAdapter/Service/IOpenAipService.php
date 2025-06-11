<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Service;


interface IOpenAipService
{
    function readAirports(int $page = 1, OpenAipImportFilter $importFilter = null): OpenAipReadAirportResponse;

    function readAirspaces(int $page = 1, OpenAipImportFilter $importFilter = null): OpenAipReadAirspacesResponse;

    function readNavaids(int $page = 1, OpenAipImportFilter $importFilter = null): OpenAipReadNavaidsResponse;
}
