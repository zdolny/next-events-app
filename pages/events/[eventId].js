import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const EventDetail = (props) => {
  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No such event</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps = async (context) => {
  const { eventId } = context.params;
  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default EventDetail;
