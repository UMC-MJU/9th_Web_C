import { Children, cloneElement, useEffect, useMemo, useState } from "react";

type LinkProps = {
  to: string;
  children: React.ReactNode; 
}
type RouteProps = {
  path: string;
  component: () => React.ReactElement;
}
type RoutesProps = {
  children: React.ReactElement<RouteProps>[];
}

//Link 내부 함수
const navigateTo = (path: string) => {
  window.history.pushState({}, "", path); //path -> 바꾸고 싶은 url 경로
  window.dispatchEvent(new PopStateEvent("popstate"));
  // dispatchEvent : 반강제 이벤트 실행, new PopStateEvent : popstate 특수 이벤트 객체 생성
};

//Link
export const Link = ({to, children}: LinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if(getCurrentPath() === to) return ; //가려는 주소와 현재 경로가 같은 경우 return 
    navigateTo(to);
  }
  return (
    <a href={to} onClick={handleClick}>{children}</a>
  )
}

//Route
export const Route = ({component: Component}: RouteProps) => {
  return <Component />;
}

//Routes 내부 함수
const getCurrentPath = () => {
  return window.location.pathname; //pathname : url 도메인 뒷부분만 가져옴
}
const useCurrentPath = () => {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };
    window.addEventListener("popstate", onLocationChange); // popstate 실행시 onLocationChange 실행
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  return currentPath;
};

//Routes
export const Routes = ({children}: RoutesProps) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children) as React.ReactElement<RouteProps>[];
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if(!activeRoute) return null;
  return cloneElement(activeRoute);
}

