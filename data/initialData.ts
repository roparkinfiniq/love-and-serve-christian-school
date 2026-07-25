import { TeamMember, FacilityItem } from '../types';
import teamJson from '../public/content/team.json';
import facilitiesJson from '../public/content/facilities.json';

export const INITIAL_TEAM_MEMBERS: TeamMember[] = (teamJson.members || teamJson) as TeamMember[];
export const INITIAL_FACILITIES: FacilityItem[] = (facilitiesJson.items || facilitiesJson) as FacilityItem[];
