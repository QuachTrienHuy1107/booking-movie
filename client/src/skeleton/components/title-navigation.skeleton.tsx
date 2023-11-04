import Skeleton from "components/shared/skeleton";
import "../../styles/components/_title-navigation.scss";

export default function TitleNavigationSkeleton() {
  return (
    <div className="heading-title">
      <Skeleton width={150} />
      <Skeleton width={50} />
    </div>
  );
}
