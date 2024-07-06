import { IconLoader2 } from "@tabler/icons-react";
import { ChevronDown, ChevronUp, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { POIDetails, POIPopupInfo } from "@/map.types";
import { usePOIDetails } from "@/hooks/map/usePOI";

type POIPopupProps = {
  info: POIPopupInfo;
  expanded: boolean;
  onToggleExpanded: () => void;
};

export function POIPopup({ info, expanded, onToggleExpanded }: POIPopupProps) {
  const { data, error, isLoading } = usePOIDetails(
    info.properties.id,
    expanded
  );

  const formatMainCategory = (category: string): string => {
    return category?.replace(/_/g, " ").toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg">
      <h3 className="font-semibold text-gray-900 text-sm">
        {info.properties.primary_name}
      </h3>
      <p className="text-gray-500 text-sm mb-1">
        {formatMainCategory(info.properties.main_category)}
      </p>
      <Button size="xs" variant="outline" onClick={onToggleExpanded}>
        {isLoading ? (
          <IconLoader2 className="animate-spin mr-1" size={16} />
        ) : (
          <Info size={16} className="mr-1" />
        )}
        {expanded ? "Hide Details" : "Show Details"}
        {expanded ? (
          <ChevronUp className="ml-1" size={16} />
        ) : (
          <ChevronDown className="ml-1" size={16} />
        )}
      </Button>
      {expanded && (
        <div>
          {error && (
            <div className="bg-red-100 text-red-900 rounded-md p-2">
              <p>Error loading details. Try again later.</p>
            </div>
          )}
          {data && <POIDetailsContent details={data} />}
        </div>
      )}
    </div>
  );
}

function POIDetailsContent({ details }: { details: POIDetails }) {
  return (
    <div className="text-gray-900 bg-gray-100 rounded-lg text-sm p-2">
      {details.websites && details.websites.length > 0 && (
        <div>
          <strong>Websites:</strong>
          <div className="flex flex-wrap gap-1">
            {details.websites.map((website: string, index: number) => (
              <Button key={index} size="xs" variant="link">
                <ExternalLink size={16} className="mr-1" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
            ))}
          </div>
        </div>
      )}
      {details.socials && details.socials.length > 0 && (
        <div>
          <strong>Socials:</strong>
          <div className="flex flex-wrap gap-1">
            {details.socials.map((social: string, index: number) => (
              <Button key={index} size="sm" variant="link">
                <ExternalLink size={16} className="mr-1" />
                <a href={social} target="_blank" rel="noopener noreferrer">
                  Visit Page
                </a>
              </Button>
            ))}
          </div>
        </div>
      )}
      {details.phones && (
        <div className="mb-1">
          <strong>Phones:</strong>
          <div className="ml-4">{details.phones.join(", ")}</div>
        </div>
      )}
      {details.addresses && Array.isArray(details.addresses) && (
        <div>
          <strong>Address:</strong>
          {details.addresses.map((address: any, index: number) => (
            <div key={index} className="ml-4">
              {address.freeform && <div>{address.freeform}</div>}
              {address.locality && <span>{address.locality}, </span>}
              {address.postcode && <span>{address.postcode}, </span>}
              {address.region && <span>{address.region}, </span>}
              {address.country && <span>{address.country}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
