/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ItineraryItem {
  day: string;
  activity: string;
}

export interface PricingItem {
  item: string;
  cost: string;
}

export interface PackageData {
  title: string;
  price: string;
  image: string;
  tag: string;
  features: string[];
  status: string;
  progress: number;
  color: string;
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  pricing: PricingItem[];
}
