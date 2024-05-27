update openaip_airspace2 set type = 'FIZ', category = 'FIZ' where name = 'FIZ SAMEDAN 135.325';

delete from openaip_airspace2
where name in (
    'LUGANO CTR'
);
